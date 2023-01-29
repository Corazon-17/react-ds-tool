import { ApexOptions } from "apexcharts";

export const getRoute = (name: string) => {
  return name.toLowerCase().replaceAll(/[\s/]/g, "-");
};

type BaseCase = "camel" | "snake" | "pascal" | undefined;
export const splitAndCapitalize = (
  str: string,
  splitBy: string = " ",
  baseCase: BaseCase = undefined
) => {
  if (!str) {
    return "";
  }

  let splitted: string[];

  if (baseCase === "camel" || baseCase === "pascal") {
    splitted = str.split(/(?=[A-Z])/);
  } else if (baseCase === "snake") {
    splitted = str.split("_");
  } else {
    splitted = str.split(splitBy);
  }

  const result = splitted.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return result.join(" ");
};

/**
 * Read dataset in csv format from url.
 * @param url : dataset url (github).
 * @returns
 */
export const csvFromUrl = async (url: string) => {
  const response = await fetch(url);
  const csv = await response.text().then((str) => {
    return str;
  });

  return csv;
};

/**
 * Parse csv dataset string into JSON.
 * @param str : dataset string in csv format.
 * @param delim : delimiter to split each data.
 * @returns
 */
export const csvToJSON = (str: string) => {
  const csv = str.replaceAll(",,", ", ,");

  // regex reference: https://stackoverflow.com/a/11457952
  const regex = /(".*?"|[^",\n]+)(?=\s*,|\s*$)/g;
  const headers = csv.trim().slice(0, str.indexOf("\n")).match(regex);
  const rows = csv
    .trim()
    .slice(csv.indexOf("\n") + 1)
    .split("\n");

  const newArray = rows.map((row) => {
    const values = row.match(regex);
    const eachObject = headers?.reduce((obj: any, header, i) => {
      // obj[header] = values ? values[i] : "";
      if (values) {
        obj[header] =
          values[i] === undefined
            ? undefined
            : values[i].trim() === ""
            ? undefined
            : !Number.isNaN(Number(values[i]))
            ? Number(values[i])
            : values[i];
      } else {
        obj[header] = undefined;
      }

      return obj;
    }, {});

    return eachObject;
  });

  return newArray;
};

export const jsonToCSV = (JSON: Array<{}>) => {
  const columns = Object.keys(JSON[0]);
  let csv = columns.toString();

  JSON.forEach((data) => {
    csv += `\n${Object.values(data).toString()}`;
  });

  return csv;
};

export function downloadText(fileName: string, text: string) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", fileName);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export const ApexDefaultOptions: ApexOptions = {
  chart: {
    background: "#18181b",
    foreColor: "#fff",
    toolbar: {
      show: true,
    },
  },
  theme: {
    mode: "dark",
    palette: "palette1",
  },
  noData: {
    text: "Loading...",
  },
};
