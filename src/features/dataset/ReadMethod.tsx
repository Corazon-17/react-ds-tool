import { useEffect, useState } from "react";
import { FileInput, SelectBox, TextArea, TextInput } from "@/components/inputs";
import { ValueSetter } from "@/types";
import { csvToJSON, csvFromUrl } from "@/utils";

interface ReaderProps {
  setDataset: ValueSetter<any>;
}

interface UploadFileProps extends ReaderProps {
  setName: ValueSetter<any>;
}

export const UploadFile = ({ setDataset, setName }: UploadFileProps) => {
  const [file, setFile] = useState<any>();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result;
        setDataset(csvToJSON(text as string));
        setName(file.name.split(".")[0]);
      };

      reader.readAsText(file as Blob);
    } else {
      setDataset([]);
    }
  }, [file]);

  return <FileInput label="Upload File" value={file} setValue={setFile} />;
};

export const GithubURL = ({ setDataset }: ReaderProps) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const readDataset = async () => {
      try {
        const text = await csvFromUrl(url);
        const dataset = csvToJSON(text);

        if (dataset.length > 0) {
          setDataset(dataset);
        }
      } catch {}
    };

    if (url.trim() !== "") {
      readDataset();
    } else {
      setDataset([]);
    }
  }, [url]);

  return <TextInput label="Github URL" value={url} setValue={setUrl} />;
};

export const ManualInput = ({ setDataset }: ReaderProps) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (text.split("\n").length > 1) {
      const dataset = csvToJSON(text);
      setDataset(dataset);
    } else {
      setDataset([]);
    }
  }, [text]);

  return <TextArea label="Input Dataset" value={text} setValue={setText} />;
};

export const SampleData = ({ setDataset }: ReaderProps) => {
  const sample = {
    "Iris Dataset":
      "https://raw.githubusercontent.com/venky14/Machine-Learning-with-Iris-Dataset/master/Iris.csv",
    "Titanic Dataset":
      "https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv",
  };

  type SampleKey = keyof typeof sample;
  const options = Object.keys(sample);
  const [data, setData] = useState<string>(options[0]);

  useEffect(() => {
    const readDataset = async () => {
      try {
        const text = await csvFromUrl(sample[data as SampleKey]);
        setDataset(csvToJSON(text));
      } catch {
        setDataset([]);
      }
    };

    readDataset();
  }, [data]);

  return (
    <SelectBox
      label="Select Dataset"
      options={options}
      value={data}
      setValue={setData}
    />
  );
};
