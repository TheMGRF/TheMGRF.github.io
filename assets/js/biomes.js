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
        "    \"options\": {",
        "      \"type\": \"minecraft:{}\"",
        "    },",
        "    {}",
        "  },",
        "  {},",
        "  {},",
        "  {},",
        "  {},",
        "  {},",
        "  {}",
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
        if (type === "number" || type === "color" || (type === "select-one" && labelText !== "particle")) {
            const val = "\"" + labelText + "\": " + value;
            data[slot] = data[slot].replaceAll("{}", val);
            console.log(val);
        } else {
            if (labelText === "particle") {
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

const particles = [
    "ambient_entity_effect",
    "angry_villager",
    "ash",
    "barrier",
    "block",
    "bubble",
    "bubble_pop",
    "bubble_column_up",
    "campfire_cosy_smoke",
    "campfire_signal_smoke",
    "cloud",
    "composter",
    "crimson_spore",
    "crit",
    "current_down",
    "damage_indicator",
    "dolphin",
    "dragon_breath",
    "dripping_dripstone_lava",
    "dripping_dripstone_water",
    "dripping_lava",
    "dripping_obsidian_tear",
    "dripping_water",
    "dust",
    "dust_color_transition",
    "effect",
    "elder_guardian",
    "electric_spark",
    "enchant",
    "enchanted_hit",
    "end_rod",
    "entity_effect",
    "explosion_emitter",
    "explosion",
    "falling_dripstone_lava",
    "falling_dripstone_water",
    "falling_dust",
    "falling_lava",
    "falling_obsidian_tear",
    "falling_spore_blossom",
    "falling_water",
    "firework",
    "fishing",
    "flame",
    "flash",
    "glow",
    "glow_squid_ink",
    "happy_villager",
    "heart",
    "instant_effect",
    "item",
    "item_slime",
    "item_snowball",
    "landing_lava",
    "landing_obsidian_tear",
    "large_smoke",
    "lava",
    "light",
    "mycelium",
    "nautilus",
    "note",
    "poof",
    "portal",
    "rain",
    "scrape",
    "smoke",
    "sneeze",
    "snowflake",
    "soul",
    "soul_fire_flame",
    "spit",
    "splash",
    "spore_blossom_air",
    "squid_ink",
    "sweep_attack",
    "totem_of_undying",
    "underwater",
    "vibration",
    "warped_spore",
    "wax_off",
    "wax_on",
    "white_ash",
    "witch"
]

particles.forEach(particle => {
    let opt = document.createElement("option");
    opt.value = particle;
    opt.textContent = particle.toUpperCase();

    document.getElementById("particle").append(opt)
});