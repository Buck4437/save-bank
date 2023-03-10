import JSZip from "jszip";
import { saveAs } from "file-saver";

// eslint-disable-next-line no-unused-vars
class File {

    static copyText(text) {
        // Source: https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript

        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        try {
            document.execCommand("copy");
            console.log("Auto-copy successful");
        } catch (e) {
            console.log("Auto-copy unsuccessful");
            prompt("Failed to Auto-copy. Please copy manually:", text);
        }
        document.body.removeChild(el);
    }

    static download(filename, text) {
        // Source: https://www.bitdegree.org/learn/javascript-download

        const element = document.createElement("a");
        element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
        element.setAttribute("download", filename);

        element.style.display = "none";
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
    }

    static downloadAllSaves(saves) {
        const zip = new JSZip();
        for (const category of saves) {
            if (category instanceof Saves.CategoryGrouped) {
                for (const group of category.saves) {
                    const folder = zip.folder(category.name).folder(group.name);
                    File.addSavesToFolder(folder, group.saves);
                }
            } else {
                const folder = zip.folder(category.name);
                File.addSavesToFolder(folder, category.saves);
            }
        }

        zip.generateAsync({ type: "blob" })
            .then(blob => {
                saveAs(blob, "AD Save Bank - All Saves.zip");
            });
    }

    static addSavesToFolder(folder, saves) {
        for (const save of saves) {
            folder.file(`${save.name.replace(/[/]/ug, ", ")}.txt`, `${save.data}\n`);
        }
    }

}

export default File;
