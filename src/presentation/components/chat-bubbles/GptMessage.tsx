import Markdown from "react-markdown";

interface Props {
  text: string;
  info?: {
    pros: string[];
    cons: string[];
  };
}

export const GptMessage = ({ text, info }: Props) => {
    return (
      <div className="col-start-1 col-end-9 p-3 rounded-lg">
        <div className="flex flex-row items-start">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
            G
          </div>
          <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
            {info ? (
              <div>
                <h3 className="font-bold">Pros:</h3>
                <ul className="list-disc pl-5">
                  {info.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                </ul>
                <h3 className="font-bold mt-2">Cons:</h3>
                <ul className="list-disc pl-5">
                  {info.cons.map((con, i) => <li key={i}>{con}</li>)}
                </ul>
              </div>
            ) : (
              <Markdown>{text}</Markdown>
            )}
          </div>
        </div>
      </div>
    );
  }