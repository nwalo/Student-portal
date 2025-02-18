import React from "react";

interface Props {
  title?: string;
  description?: string | React.ReactNode;
  icon?: React.JSX.Element;
  isFetching?: boolean;
}

const NoData: React.FC<Props> = ({
  title = "No data yet",
  description,
  isFetching,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center py-[30%] md:py-[15%]">
      {isFetching ? (
        "Loading..."
      ) : (
        <>
          <div className="my-3">
            <p className="font-semibold text-lg my-2">{title}</p>
            <p className="text-gray-400" style={{ whiteSpace: "pre-line" }}>
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default NoData;
