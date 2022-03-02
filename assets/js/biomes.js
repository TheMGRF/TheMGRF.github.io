const form = document.getElementById("biome-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    submit(form.elements);
});

const output = document.getElementById("output");
const slots = [4, 5, 6, 11, 13, 15, 16, 17, 18, 19, 20];

function submit(formData) {
    console.log("Creating biome data...")

    // idc if this sucks
    let data = [
        "{",
        "\"surface_builder\": \"minecraft:grass\",",
        "\"depth\": 0.45,",
        "\"scale\": 0.6,",
        "{},",
        "{},",
        "{},",
        "\"category\": \"none\",",
        "\"effects\": {",
        "  \"particle\": {",
        "   \"options\": {",
        "    \"type\": \"minecraft:{}\"",
        "   },",
        "   {},",
        "  },",
        "  {},",
        "  {},",
        "  {},",
        "  {},",
        "  {},",
        "  {},",
        "},",
        "\"starts\": [],",
        "\"spawners\": {},",
        "\"spawn_costs\": {},",
        "\"carvers\": {},",
        "\"features\": []",
        "}"
    ];

    for (let i = 0; i < formData.length; i++) {
        const entry = formData[i];
        if (entry.id === "Submit" || entry.id === "name") continue;

        const type = entry.type;
        let value = entry.value;
        if (type === "color") {
            value = value.replaceAll("#", "");
            value = parseInt(value, 16);
        }

        const label = entry.labels[0];
        if (label === undefined) continue;

        // this is a real bodge to account for the name section :sadmario:
        const slot = slots[i - 1];
        console.log("SLOT: " + slot)
        const labelText = entry.name;
        if (type === "number" || type === "color") {
            const val = "\"" + labelText + "\": " + value;
            data[slot] = data[slot].replaceAll("{}", val);
            console.log(val);
        } else {
            if (labelText === "particle") {
                //const output = "\"type\": \"minecraft:" + value + "\"";
                const val = data[slot].replaceAll("{}", value);
                data[slot] = val;
                console.log(val);
            } else {
                const output = "\"" + labelText + "\": \"" + value + "\"";
                data[slot] = output;
                console.log(output);
            }
        }
    }

    console.log("Done creating biome!")

    output.textContent = "";
    output.setAttribute("style", "white-space: pre;")
    for (let i = 0; i < data.length; i++) {
        if (i === 0 || i === (data.length - 1)) {
            output.textContent += data[i] + "\n";
            continue;
        }
        output.textContent += "  " + data[i] + "\n";
    }
}

const download = document.getElementById("download-btn");
download.addEventListener("click", (event) => {
    downloadFile(
        document.getElementById("name").value,
        document.getElementById("output").textContent
    );
});

function downloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename + ".json");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}