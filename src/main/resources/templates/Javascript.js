// Oppretter en tom liste for billetter
let billettListe = [];

// Funksjon for å kjøpe billett
function KjopB() {
    const film = document.getElementById("film").value;
    const antall = document.getElementById("antall").value;
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const telefonnr = document.getElementById("telefonnr").value;
    const epost = document.getElementById("epost").value;

    const telefonRegex = /^\d{8}$/;
    const navnRegex = /^[a-zA-ZæøåÆØÅ\s]+$/;
    const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Tilbakestill tidligere feilmeldinger
    resetErrorMessages();

    // Oppretter en liste for feilmeldinger
    let errorMessages = [];

    // Validerer input-verdier
    if (film === "") { // Sjekker om film ikke er valgt
        errorMessages.push("Du må velge film for å kjøpe billett.");
    }
    if (!antall || isNaN(antall) || parseInt(antall) < 1) {
        errorMessages.push("Du må velge et gyldig tall for antall billetter.");
    }
    if (!fornavn || !isNaN(fornavn)) {
        errorMessages.push("Du må fylle ut fornavn for å kjøpe billett.");
    }
    if (!etternavn || !isNaN(etternavn)) {
        errorMessages.push("Du må fylle ut etternavn for å kjøpe billett.");
    }
    if (!telefonnr || !telefonRegex.test(telefonnr)) {
        errorMessages.push("Du må skrive inn et gyldig telefonnummer.");
    }
    if (!epost || !epostRegex.test(epost)) {
        errorMessages.push("Du må fylle inn en gyldig e-postadresse.");
    }
    if (!telefonRegex.test(telefonnr)) {
        errorMessages.push("Du må skrive inn et gyldig telefonnummer med 8 siffer.");
    }

    if (!navnRegex.test(fornavn)) {
        errorMessages.push("Fornavn må inneholde bare bokstaver.");
    }

    if (!navnRegex.test(etternavn)) {
        errorMessages.push("Etternavn må inneholde bare bokstaver.");
    }

    // Håndterer feilmeldinger
    if (errorMessages.length > 0) {
        displayErrorMessages(errorMessages);
        return;
    }

    // Oppretter billett-objekt og legger til i listen
    const billett = {
        film,
        antall,
        fornavn,
        etternavn,
        telefonnr,
        epost
    };

    billettListe.push(billett);

    // Oppdaterer visningen av billetter
    visBilletter();

    // Tilbakestill skjemaet
    nullstillInput();
}

// Funksjon for å mappe feilmeldinger til riktig input-felt
function getInputElementId(errorMessage) {
    switch (errorMessage) {
        case "Du må velge film for å kjøpe billett.":
            return "film";
        case "Du må velge et gyldig tall for antall billetter.":
            return "antall";
        case "Du må fylle ut fornavn for å kjøpe billett.":
            return "fornavn";
        case "Du må fylle ut etternavn for å kjøpe billett.":
            return "etternavn";
        case "Du må skrive inn et gyldig telefonnummer.":
            return "telefonnr";
        case "Du må fylle inn en gyldig e-postadresse.":
            return "epost";
        case "Du må skrive inn et gyldig telefonnummer med 8 siffer.":
            return "telefonnr";
        case "Fornavn må inneholde bare bokstaver.":
            return "fornavn";
        case "Etternavn må inneholde bare bokstaver.":
            return "etternavn";
        default:
            return "";
    }
}

// Funksjon for å vise billetter i HTML
function visBilletter() {
    const billettListeElement = document.getElementById("billettListe");
    billettListeElement.innerHTML = "";

    // Oppretter HTML-tabell
    let ut = "<table><tr>" +
        "<th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";

    // Legger til billetter i tabellen
    for (let p of billettListe) {
        ut += "<tr>";
        ut += "<td>" + p.fornavn + "</td><td>" + p.etternavn + "</td><td>" + p.telefonnr + "</td><td>" + p.epost + "</td>";
        ut += "</tr>";
    }

    ut += "</table>";

    // Oppdaterer HTML-innholdet
    billettListeElement.innerHTML = ut;
}

// Funksjon for å slette alle billetter
function slettB() {
    billettListe = [];
    document.getElementById("billettListe").innerHTML = "";
}

// Funksjon for å nullstille skjema og feilmeldinger
function nullstillInput() {
    document.getElementById("film").value = "";
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("telefonnr").value = "";
    document.getElementById("epost").value = "";

    // Tilbakestill feilmeldinger
    resetErrorMessages();
}

// Funksjon for å tilbakestille feilmeldinger
function resetErrorMessages() {
    document.getElementById("filmError").innerHTML = "";
    document.getElementById("antallError").innerHTML = "";
    document.getElementById("fornavnError").innerHTML = "";
    document.getElementById("etternavnError").innerHTML = "";
    document.getElementById("telefonnrError").innerHTML = "";
    document.getElementById("epostError").innerHTML = "";
}

// Funksjon for å vise feilmeldinger ved siden av tilsvarende input-felt
function displayErrorMessages(errors) {
    errors.forEach((error, index) => {
        const errorElement = document.getElementById(`${getInputElementId(errors[index])}Error`);
        if (errorElement) {
            errorElement.innerHTML = error;
        }
    });
}

