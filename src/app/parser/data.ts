import fs from "fs";
import results from "../../../games/mar31-TyFNs8V8EpAxc9VU.json";

const getResults = () => {
    fs.readdirSync("games").forEach((file) => {
        console.log(file);
      });

    // console.log("hello!");

    // console.log(results);
    return results
}

export default getResults
