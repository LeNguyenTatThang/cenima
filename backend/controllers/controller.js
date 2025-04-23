// controllers/controller.js

let heroes = [
    { id: 1, name: 'Batman' },
    { id: 2, name: 'Spiderman' }
];

async function getHeroesHandler(req, res) {
    res.status(200).json(heroes);
}

async function addHeroHandler(req, res) {
    const { id, name } = req.body;

    if (heroes.find(hero => hero.id === id)) {
        return res.status(409).json({ message: 'Hero id must be unique' });
    }

    heroes.push({ id, name });
    return res.status(201).json({ id, name });
}

async function deleteHeroHandler(req, res) {
    const { id } = req.params;

    const index = heroes.findIndex(hero => hero.id == id);
    if (index >= 0) {
        heroes.splice(index, 1); // Xóa hero
        res.status(200).json({ message: 'Hero deleted successfully', heroes });
    } else {
        res.status(404).json({ message: 'Hero not found' });
    }
}

async function editHeroHandler(req, res) {
    const { id, name } = req.body;

    const index = heroes.findIndex(hero => hero.id == id);
    if (index >= 0) {
        heroes[index] = { id, name }; // Cập nhật hero
        res.status(200).json({ message: 'Hero updated successfully', heroes });
    } else {
        res.status(404).json({ message: 'Hero not found' });
    }
}

// Xuất các hàm sử dụng module.exports
module.exports = {
    getHeroesHandler,
    addHeroHandler,
    deleteHeroHandler,
    editHeroHandler
};
