const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('partners.db');

function loadPartners() {
    db.all(`SELECT * FROM Partners`, (err, rows) => {
        if (err) {
            console.error('Ошибка загрузки партнёров:', err);
            return;
        }
        console.log('Загруженные партнёры:', rows); // Отладка
        const partnersList = document.querySelector('#partnersList');
        partnersList.innerHTML = '';
        if (rows.length === 0) {
            partnersList.innerHTML = '<p>Нет данных о партнёрах.</p>';
            return;
        }
        rows.forEach(row => {
            const partnerBlock = document.createElement('div');
            partnerBlock.className = 'partner-block';
            partnerBlock.innerHTML = `
                <div class="row">
                    <div class="col-8 partner-info">
                        <p><strong>Наименование:</strong> ${row.partner_name}</p>
                        <p><strong>Тип:</strong> ${row.partner_type}</p>
                        <p><strong>Директор:</strong> ${row.director}</p>
                        <p><strong>Электронная почта:</strong> ${row.email}</p>
                        <p><strong>Телефон:</strong> ${row.phone}</p>
                        <p><strong>Юридический адрес:</strong> ${row.legal_address}</p>
                        <p><strong>ИНН:</strong> ${row.inn}</p>
                        <p><strong>Рейтинг:</strong> ${row.rating}</p>
                    </div>
                    <div class="col-4 text-end">
                        <button class="btn btn-sm btn-accent me-2" onclick="editPartner(${row.partner_id})">Редактировать</button>
                        <button class="btn btn-sm btn-accent me-2" onclick="deletePartner(${row.partner_id})">Удалить</button>
                        <button class="btn btn-sm btn-accent" onclick="viewSales(${row.partner_id}, '${row.partner_name}')">История продаж</button>
                    </div>
                </div>
            `;
            partnersList.appendChild(partnerBlock);
        });
    });
}

document.getElementById('partnerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const partnerId = document.getElementById('partnerId').value;
    const partnerType = document.getElementById('partnerType').value;
    const partnerName = document.getElementById('partnerName').value;
    const director = document.getElementById('director').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const legalAddress = document.getElementById('legalAddress').value;
    const inn = document.getElementById('inn').value;
    const rating = document.getElementById('rating').value;

    if (partnerId) {
        db.run(
            `UPDATE Partners SET partner_type = ?, partner_name = ?, director = ?, email = ?, phone = ?, legal_address = ?, inn = ?, rating = ? WHERE partner_id = ?`,
            [partnerType, partnerName, director, email, phone, legalAddress, inn, rating, partnerId],
            (err) => {
                if (err) {
                    console.error('Ошибка обновления:', err);
                    return;
                }
                loadPartners();
                resetForm();
            }
        );
    } else {
        db.run(
            `INSERT INTO Partners (partner_type, partner_name, director, email, phone, legal_address, inn, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [partnerType, partnerName, director, email, phone, legalAddress, inn, rating],
            (err) => {
                if (err) {
                    console.error('Ошибка добавления:', err);
                    return;
                }
                loadPartners();
                resetForm();
            }
        );
    }
});

function editPartner(id) {
    db.get(`SELECT * FROM Partners WHERE partner_id = ?`, [id], (err, row) => {
        if (err) {
            console.error('Ошибка редактирования:', err);
            return;
        }
        document.getElementById('partnerId').value = row.partner_id;
        document.getElementById('partnerType').value = row.partner_type;
        document.getElementById('partnerName').value = row.partner_name;
        document.getElementById('director').value = row.director;
        document.getElementById('email').value = row.email;
        document.getElementById('phone').value = row.phone;
        document.getElementById('legalAddress').value = row.legal_address;
        document.getElementById('inn').value = row.inn;
        document.getElementById('rating').value = row.rating;
        document.getElementById('cancelEdit').style.display = 'inline-block';
    });
}

function deletePartner(id) {
    if (confirm('Вы уверены, что хотите удалить этого партнёра?')) {
        db.run(`DELETE FROM Partners WHERE partner_id = ?`, [id], (err) => {
            if (err) {
                console.error('Ошибка удаления:', err);
                return;
            }
            loadPartners();
        });
    }
}

function viewSales(partnerId, partnerName) {
    db.all(`
        SELECT s.quantity, s.sale_date, p.product_name
        FROM Sales s
        JOIN Products p ON s.product_id = p.product_id
        WHERE s.partner_id = ?
        ORDER BY s.sale_date DESC
    `, [partnerId], (err, rows) => {
        if (err) {
            console.error('Ошибка загрузки истории продаж:', err);
            return;
        }
        const salesTableBody = document.getElementById('salesTableBody');
        salesTableBody.innerHTML = '';
        if (rows.length === 0) {
            salesTableBody.innerHTML = '<tr><td colspan="3">Нет данных о продажах.</td></tr>';
        } else {
            rows.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.product_name}</td>
                    <td>${row.quantity}</td>
                    <td>${row.sale_date}</td>
                `;
                salesTableBody.appendChild(tr);
            });
        }
        document.getElementById('salesModalLabel').textContent = `История продаж: ${partnerName}`;
        const modal = new bootstrap.Modal(document.getElementById('salesModal'));
        modal.show();
    });
}

function resetForm() {
    document.getElementById('partnerForm').reset();
    document.getElementById('partnerId').value = '';
    document.getElementById('cancelEdit').style.display = 'none';
}

document.getElementById('cancelEdit').addEventListener('click', resetForm);

loadPartners();

window.onbeforeunload = () => {
    db.close((err) => {
        if (err) {
            console.error('Ошибка при закрытии базы данных:', err);
        }
    });
};