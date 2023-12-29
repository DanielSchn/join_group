// gedacht als frei zur Verfügung gestellte Datenbank, um Tasks zu testen

let categories = ['Technical Task', 'User Story']; // eigene Deklaration, um später problemlos weitere Kategorien hinzuzufügen
let contacts = [];
let TEST_TASKS = [
    {
        id: 0,
        title: 'Geschenke kaufen',
        description: 'Geschenke für Mama, Papa und den Hund. Und noch so viele Geschenke mehr, denn eigentlich bin ich der Weihnachtsmann und teste gerade mit diesem Text nur, dass die seite sich so verhält wie ich das möchte',
        assignedTo: [0, 1], // Kontakte als IDs hinterlegt, setzt Kontakte-Array voraus
        due: '24/12/2023',
        prio: 'urgent', // low, medium, urgent
        category: 1, // Index für category-Array
        subtasks: [
            {
                title: 'Mama Geschenk',
                status: 'done' // toDo, done
            },

            {
                title: 'Papa Geschenk',
                status: 'done'
            },

            {
                title: 'Hund Geschenk',
                status: 'done'
            }
        ],
        timestamp: 1702645998476,
        status: 'toDo' // toDo, inProcess, awaitFeedback, done
    },
    {
        id: 1,
        title: 'Einkaufen',
        description: 'Äpfel, Birnen, Milch, Eier',
        assignedTo: [1],
        due: '19/12/2023',
        prio: 'low',
        category: 0, // Index für category-Array
        subtasks: [],
        timestamp: 1702647192299,
        status: 'inProgress'
    },
    {
        id: 2,
        title: 'wäsche waschen',
        description: 'Kochwäsche, Pflegeleicht',
        assignedTo: [1],
        due: '22/12/2023',
        prio: 'low',
        category: 0, // Index für category-Array
        subtasks: [],
        timestamp: 1702647193399,
        status: 'awaitFeedback'
    },
    {
        id: 3,
        title: 'essen kochen',
        description: 'Spaghetti, Brokkoli, Zwiebeln, Sahne',
        assignedTo: [0],
        due: '24/12/2023',
        prio: 'low',
        category: 0, // Index für category-Array
        subtasks: [],
        timestamp: 1702647193451,
        status: 'done'
    }
];

function resetTEST_TASKS() {
    TEST_TASKS = TEST_TASKS.splice(0,4);
    setItem('test', JSON.stringify(TEST_TASKS));
}

const TEST_CONTACTS = [
    {
        name: 'Anton',
        lastName: 'Mayer'
    },

    {
        name: 'Berta',
        lastName: 'Müller'
    },

    {
        name: 'Clara',
        lastName: 'Schmidt'
    },

    {
        name: 'Deniz',
        lastName: 'Yildiz'
    },

    {
        name: 'Eva',
        lastName: 'Hofmann'
    },

    {
        name: 'Ferdinand',
        lastName: 'Porsche'
    },

    {
        name: 'Günther',
        lastName: 'Hillmann'
    }
];