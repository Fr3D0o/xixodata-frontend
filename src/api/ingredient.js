async function getAll() {
    try {
        const response = await fetch('http://localhost:3000/ingredients/getAll');
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
            pesCuita: form.pesCuita,
            mermeCuita: form.mermeCuita,
            pesRealCuita: form.mermeCuita,
            pes: form.pes,
            merme: form.merme,
            pesReal: form.pesReal,
        })
    }

    try {
        const response = await fetch('http://localhost:3000/ingredients/add', opts);
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
            pesCuita: form.pesCuita,
            mermeCuita: form.mermeCuita,
            pesRealCuita: form.mermeCuita,
            pes: form.pes,
            merme: form.merme,
            pesReal: form.pesReal,
        })
    }

    try {
        const response = await fetch(`http://localhost:3000/ingredients/edit/${id}`, opts);
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
        const response = await fetch(`http://localhost:3000/ingredients/remove/${id}`, opts);
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
