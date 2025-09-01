
const handleExtensions = async () => {

    const filterButtons = document.querySelectorAll(".extensions-list-buttons button");

    const extensions = document.querySelector(".extensions-list-content");
    const response = await fetch("data.json")
    const data = await response.json();


    const displayExtensions = async (data) => {
        extensions.innerHTML = ""

        data.forEach((extension) => {

            const newExtension = `
                <div class="extension">

                        <div class="extension-content">
                            <img class="extension-content-image" src=${extension.logo}></img>

                            <div class="extension-content-textbox">
                            <span class="extension-content-header">${extension.name}</span>
                            <div class="extension-content-description">${extension.description}</div>
                            </div>
                        </div>

                        <div class="extension-content-buttons">
                            <button class="extension-content-remove">Remove</button>
                            <button class="toggle ${extension.isActive ? 'toggled' : ''}">
                                <div class="toggle-background"></div>
                                <div class="toggle-button"></div>
                            </button>
                        </div>
                        </div>
            `
            extensions.insertAdjacentHTML('beforeend', newExtension)
            const addedExtension = extensions.lastElementChild;
            const toggle = addedExtension.querySelector(".toggle")
            handleToggle(toggle, extension.name);
            const removeButton = addedExtension.querySelector(".extension-content-remove")
            handleDelete(addedExtension, removeButton, extension.name);
        })     
    }

    const handleToggle = (toggle, extensionName) => {
        toggle.addEventListener("click", () => {

            const index = data.findIndex((extension) => extensionName == extension.name);
            if (index != -1) {
                if(data[index].isActive == true) {
                    data[index].isActive = false;
                } else {
                    data[index].isActive = true;
                }
            }

            if (toggle.classList.contains("toggled")) {
                toggle.classList.remove("toggled");
            } else {
                toggle.classList.add("toggled");
            }
        })
    }

    const handleDelete = (addedExtension, removeButton, extensionName) => {
        removeButton.addEventListener("click", () => {

            const index = data.findIndex((extension) => extensionName == extension.name);
            if (index != -1) {
                data.splice(index, 1)
                addedExtension.remove();
            }

        })
    }

    const handleFilter = (filter) => {
        switch(filter) {
        case "all":
            displayExtensions(data);
            break;
        case "active":
            displayExtensions(data.filter((extension) => extension.isActive))
            break;
        case "inactive":
            displayExtensions(data.filter((extension) => !extension.isActive))
            break;
        }
    }

    filterButtons.forEach(filterButton => {
        filterButton.addEventListener("click", () => {
            filterButtons.forEach(filterButton => filterButton.classList.remove("toggled"));
            const filter = filterButton.dataset.filter;
            filterButton.classList.add("toggled")
            handleFilter(filter);
        })
    })

    displayExtensions(data);
}

const handleThemeSwitch = () => {
    const themeToggle = document.querySelector(".light-dark-button");
    const body = document.querySelector("body")

    let darkmode = localStorage.getItem('darkmode')

    if(darkmode == "enabled") {
        body.classList.add("dark");  
    }

    themeToggle.addEventListener("click", () => {
        if(body.classList.contains("dark")) {
            body.classList.remove("dark");
            localStorage.setItem('darkmode', null)
        } else {
            body.classList.add("dark");
            localStorage.setItem('darkmode', 'enabled')
        }
    })
}

handleExtensions();
handleThemeSwitch();