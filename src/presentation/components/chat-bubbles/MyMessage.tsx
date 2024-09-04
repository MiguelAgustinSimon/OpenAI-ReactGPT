interface Props {
    text: string;
}

export const MyMessage = ({ text }: Props) => {
    return (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex flex-row items-start justify-end">
                <div className="relative mr-3 text-sm bg-blue-600 text-white pt-3 pb-2 px-4 shadow-lg rounded-xl">
                    <div>{text}</div>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white flex-shrink-0">
                    M
                </div>
            </div>
        </div>
    );
}