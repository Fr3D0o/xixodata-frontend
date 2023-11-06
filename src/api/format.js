async function getAll() {
    try {
        const response = await fetch('http://localhost:3000/format/getAll');
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error);
    }
}

async function getByName(nom) {
    try {
        const response = await fetch(`http://localhost:3000/format/getByName/${nom}`);
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error);
    }
}

async function getAllBySeason(temporada) {
    try {
        const response = await fetch(`http://localhost:3000/format/getAllBySeason/${temporada}`);
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error);
    }
}

async function getAllBySeasonAndName(temporada, nom) {
    try {
        const response = await fetch(`http://localhost:3000/format/getAllBySeasonAndName/${temporada}/${nom}`);
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error);
    }
}

async function add(titol, barres, cuita, form1, form2, form3, temporada) {
    let opts = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nom: titol,
            torro: titol.split(' ', 1)[0],
            barres: barres,
            cuita: cuita,
            gramsXcaixo: form2[0].quantitat,
            barresXcaixo: form2[1].quantitat,
            barresXcaixa: form2[2].quantitat,
            ingredients: form1,
            packagings: form3,
            temporada: temporada
        })
    }

    try {
        const response = await fetch('http://localhost:3000/format/add', opts);
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
            pes: form.pes,
            pesXcaixo: form.pesXcaixo,
            barresXcaixaTallat: form.barresXcaixaTallat,
            barresXcaixo: form.barresXcaixo,
            packagings: form.packagings
        })
    }

    try {
        const response = await fetch(`http://localhost:3000/format/edit/${id}`, opts);
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
        const response = await fetch(`http://localhost:3000/format/remove/${id}`, opts);
        const json = await response.json();

        return json
    } catch (error) {
        console.error(error);
    }
}

export {
    getAll,
    getByName,
    getAllBySeason,
    getAllBySeasonAndName,
    add,
    edit,
    remove
}
