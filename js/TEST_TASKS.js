// gedacht als frei zur Verfügung gestellte Datenbank, um Tasks zu testen

let categories = ['Technical Task', 'User Story']; // eigene Deklaration, um später problemlos weitere Kategorien hinzuzufügen

let TEST_TASKS = [
    {
        id: 0,
        title: 'Geschenke kaufen',
        description: 'Geschenke für Mama, Papa und den Hund',
        assignedTo: [0, 1], // Kontakte als IDs hinterlegt, setzt Kontakte-Array voraus
        due: '2023-12-24',
        prio: 2, // 0 = low, 1 = medium, 2 = urgent
        category: 1, // Index für category-Array
        subtasks: [
            {
                title: 'Mama Geschenk',
                status: 0 // 0 = 'To do', 3 = 'Done'
            },

            {
                title: 'Papa Geschenk',
                status: 0
            },

            {
                title: 'Hund Geschenk',
                status: 3
            }
        ],
        timestamp: 1702645998476,
        status: 1 // 0 = 'To do', 1 = 'In progress', 2 = 'Await feedback', 3 = 'Done'
    },

    {
        id: 1,
        title: 'einkaufen',
        description: 'Äpfel, Birnen, Milch, Eier',
        assignedTo: [1],
        due: '2023-12-19',
        prio: 1,
        category: 1, // Index für category-Array
        subtasks: [],
        timestamp: 1702647192299,
        status: 0
    }
]