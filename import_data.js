const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('partners.db');

const partners = [
    { partner_type: 'ЗАО', partner_name: 'База Строитель', director: 'Иванова Александра Ивановна', email: 'aleksandraivanova@ml.ru', phone: '493 123 45 67', legal_address: '652050, Кемеровская область, город Юрга, ул. Лесная, 15', inn: '2222455179', rating: 7 },
    { partner_type: 'ООО', partner_name: 'Паркет 29', director: 'Петров Василий Петрович', email: 'vppetrov@vl.ru', phone: '987 123 56 78', legal_address: '164500, Архангельская область, город Северодвинск, ул. Строителей, 18', inn: '3333888520', rating: 7 },
    { partner_type: 'ПАО', partner_name: 'Стройсервис', director: 'Соловьев Андрей Николаевич', email: 'ansolovev@st.ru', phone: '812 223 32 00', legal_address: '188910, Ленинградская область, город Приморск, ул. Парковая, 21', inn: '4440391035', rating: 7 },
    { partner_type: 'ОАО', partner_name: 'Ремонт и отделка', director: 'Воробьева Екатерина Валерьевна', email: 'ekaterina.vorobeva@ml.ru', phone: '444 222 33 11', legal_address: '143960, Московская область, город Реутов, ул. Свободы, 51', inn: '1111520857', rating: 5 },
    { partner_type: 'ЗАО', partner_name: 'МонтажПро', director: 'Степанов Степан Сергеевич', email: 'stepanov@stepan.ru', phone: '912 888 33 33', legal_address: '309500, Белгородская область, город Старый Оскол, ул. Рабочая, 122', inn: '5552431140', rating: 10 }
];

const productTypes = [
    { type_name: 'Ламинат', type_coefficient: 2.35 },
    { type_name: 'Массивная доска', type_coefficient: 5.15 },
    { type_name: 'Паркетная доска', type_coefficient: 4.34 },
    { type_name: 'Пробковое покрытие', type_coefficient: 1.5 }
];

const materialTypes = [
    { material_type_name: 'Тип материала 1', defect_percentage: 0.0010 },
    { material_type_name: 'Тип материала 2', defect_percentage: 0.0095 },
    { material_type_name: 'Тип материала 3', defect_percentage: 0.0028 },
    { material_type_name: 'Тип материала 4', defect_percentage: 0.0055 },
    { material_type_name: 'Тип материала 5', defect_percentage: 0.0034 }
];

const products = [
    { type_name: 'Паркетная доска', product_name: 'Паркетная доска Ясень темный однополосная 14 мм', article: '8758385', min_partner_price: 4456.90 },
    { type_name: 'Паркетная доска', product_name: 'Инженерная доска Дуб Французская елка однополосная 12 мм', article: '8858958', min_partner_price: 7330.99 },
    { type_name: 'Ламинат', product_name: 'Ламинат Дуб дымчато-белый 33 класс 12 мм', article: '7750282', min_partner_price: 1799.33 },
    { type_name: 'Ламинат', product_name: 'Ламинат Дуб серый 32 класс 8 мм с фаской', article: '7028748', min_partner_price: 3890.41 },
    { type_name: 'Пробковое покрытие', product_name: 'Пробковое напольное клеевое покрытие 32 класс 4 мм', article: '5012543', min_partner_price: 5450.59 }
];

const sales = [
    { product_name: 'Паркетная доска Ясень темный однополосная 14 мм', partner_name: 'База Строитель', quantity: 15500, sale_date: '2023-03-23' },
    { product_name: 'Ламинат Дуб дымчато-белый 33 класс 12 мм', partner_name: 'База Строитель', quantity: 12350, sale_date: '2023-12-18' },
    { product_name: 'Ламинат Дуб серый 32 класс 8 мм с фаской', partner_name: 'База Строитель', quantity: 37400, sale_date: '2024-06-07' },
    { product_name: 'Инженерная доска Дуб Французская елка однополосная 12 мм', partner_name: 'Паркет 29', quantity: 35000, sale_date: '2022-12-02' },
    { product_name: 'Пробковое напольное клеевое покрытие 32 класс 4 мм', partner_name: 'Паркет 29', quantity: 1250, sale_date: '2023-05-17' },
    { product_name: 'Ламинат Дуб дымчато-белый 33 класс 12 мм', partner_name: 'Паркет 29', quantity: 1000, sale_date: '2024-06-07' },
    { product_name: 'Паркетная доска Ясень темный однополосная 14 мм', partner_name: 'Паркет 29', quantity: 7550, sale_date: '2024-07-01' },
    { product_name: 'Паркетная доска Ясень темный однополосная 14 мм', partner_name: 'Стройсервис', quantity: 7250, sale_date: '2023-01-22' },
    { product_name: 'Инженерная доска Дуб Французская елка однополосная 12 мм', partner_name: 'Стройсервис', quantity: 2500, sale_date: '2024-07-05' },
    { product_name: 'Ламинат Дуб серый 32 класс 8 мм с фаской', partner_name: 'Ремонт и отделка', quantity: 59050, sale_date: '2023-03-20' },
    { product_name: 'Ламинат Дуб дымчато-белый 33 класс 12 мм', partner_name: 'Ремонт и отделка', quantity: 37200, sale_date: '2024-03-12' },
    { product_name: 'Пробковое напольное клеевое покрытие 32 класс 4 мм', partner_name: 'Ремонт и отделка', quantity: 4500, sale_date: '2024-05-14' },
    { product_name: 'Ламинат Дуб дымчато-белый 33 класс 12 мм', partner_name: 'МонтажПро', quantity: 50000, sale_date: '2023-09-19' },
    { product_name: 'Ламинат Дуб серый 32 класс 8 мм с фаской', partner_name: 'МонтажПро', quantity: 670000, sale_date: '2023-11-10' },
    { product_name: 'Паркетная доска Ясень темный однополосная 14 мм', partner_name: 'МонтажПро', quantity: 35000, sale_date: '2024-04-15' },
    { product_name: 'Инженерная доска Дуб Французская елка однополосная 12 мм', partner_name: 'МонтажПро', quantity: 25000, sale_date: '2024-06-12' }
];

// Функции для выполнения запросов с использованием Promise
const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};

const getQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Асинхронная функция для импорта данных
async function importData() {
    try {
        // Импорт Partners
        for (const partner of partners) {
            await runQuery(
                `INSERT OR IGNORE INTO Partners (partner_type, partner_name, director, email, phone, legal_address, inn, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [partner.partner_type, partner.partner_name, partner.director, partner.email, partner.phone, partner.legal_address, partner.inn, partner.rating]
            );
        }
        console.log('Partners импортированы');

        // Импорт ProductTypes
        for (const type of productTypes) {
            await runQuery(
                `INSERT OR IGNORE INTO ProductTypes (type_name, type_coefficient) VALUES (?, ?)`,
                [type.type_name, type.type_coefficient]
            );
        }
        console.log('ProductTypes импортированы');

        // Импорт MaterialTypes
        for (const material of materialTypes) {
            await runQuery(
                `INSERT OR IGNORE INTO MaterialTypes (material_type_name, defect_percentage) VALUES (?, ?)`,
                [material.material_type_name, material.defect_percentage]
            );
        }
        console.log('MaterialTypes импортированы');

        // Импорт Products
        for (const product of products) {
            const type = await getQuery(
                `SELECT type_id FROM ProductTypes WHERE type_name = ?`,
                [product.type_name]
            );
            if (type) {
                await runQuery(
                    `INSERT INTO Products (type_id, product_name, article, min_partner_price) VALUES (?, ?, ?, ?)`,
                    [type.type_id, product.product_name, product.article, product.min_partner_price]
                );
            } else {
                console.warn(`Тип продукции ${product.type_name} не найден`);
            }
        }
        console.log('Products импортированы');

        // Импорт Sales
        for (const sale of sales) {
            const partner = await getQuery(
                `SELECT partner_id FROM Partners WHERE partner_name = ?`,
                [sale.partner_name]
            );
            const product = await getQuery(
                `SELECT product_id FROM Products WHERE product_name = ?`,
                [sale.product_name]
            );
            if (partner && product) {
                await runQuery(
                    `INSERT INTO Sales (partner_id, product_id, quantity, sale_date) VALUES (?, ?, ?, ?)`,
                    [partner.partner_id, product.product_id, sale.quantity, sale.sale_date]
                );
            } else {
                console.warn(`Ошибка импорта продажи: partner=${partner}, product=${product}`);
            }
        }
        console.log('Sales импортированы');

        // Закрытие базы данных
        db.close((err) => {
            if (err) {
                console.error('Ошибка при закрытии базы данных:', err);
            } else {
                console.log('База данных закрыта');
            }
        });
    } catch (err) {
        console.error('Ошибка при импорте данных:', err);
        db.close();
    }
}

// Запуск импорта
importData();