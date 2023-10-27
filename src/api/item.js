async function getAll() {
    try {
        const response = await fetch('http://localhost:3000/item/getAll');
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error);
    }
}

async function add(form) {
    let opts = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nom: form.nom,
            barres: form.barres,
            temporada: form.temporada,
            torro: form.torro,
            format: form.format
        })
    }

    try {
        const response = await fetch('http://localhost:3000/item/add', opts);
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error);
    }
}

async function edit(form, id) {
    let opts = {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nom: form.nom,
            barres: form.barres,
            temporada: form.temporada,
            torro: form.torro,
            format: form.format
        })
    }

    try {
        const response = await fetch(`http://localhost:3000/item/edit/${id}`, opts);
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error);
    }
}

async function remove(id) {
    let opts = {
        method: "DELETE",
    }

    try {
        const response = await fetch(`http://localhost:3000/item/remove/${id}`, opts);
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error);
    }
}

export {
    getAll,
    add,
    edit,
    remove
}
