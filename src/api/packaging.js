async function getAll() {
    try {
        const response = await fetch('http://localhost:3000/packaging/getAll');
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
            item: form.item,
            X: form.X,
            Y: form.Y,
            Z: form.Z
        })
    }

    try {
        const response = await fetch('http://localhost:3000/packaging/add', opts);
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
            item: form.item,
            X: form.X,
            Y: form.Y,
            Z: form.Z
        })
    }

    try {
        const response = await fetch(`http://localhost:3000/packaging/edit/${id}`, opts);
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
        const response = await fetch(`http://localhost:3000/packaging/remove/${id}`, opts);
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
