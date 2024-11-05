import { ConfigProvider, Slider } from "antd";
import { useEffect, useState } from "react";

const colorRanges = [
  { threshold: -50, color: "#e45b3f" }, // Rouge grisé
  { threshold: 0, color: "#f4ca3b" }, // Jaune orange
  { threshold: 50, color: "#e2e43f" }, // Jaune vert
  { threshold: 100, color: "#64f07d" }, // Vert pale
];

// Fonction pour obtenir la couleur basée sur la valeur
function getSliderColor(value: number): string {
  const range = colorRanges.find((range) => value <= range.threshold);
  return range ? range.color : "#64f07d"; // Vert pale par défaut
}

const SliderFilterMetrix = ({
  filterMetrics,
  setFilterMetrics,
}: {
  filterMetrics: {
    codeLines: number;
    maxCodeLine: number;
  };
  setFilterMetrics: React.Dispatch<
    React.SetStateAction<{
      codeLines: number;
      maxCodeLine: number;
    }>
  >;
}) => {
  const [filterPanelMetrics, setFilterPanelMetrics] = useState<{
    codeLines: number;
  }>({ ...filterMetrics });

  const [codeLinesColor, setCodeLinesColor] = useState<string>(
    getSliderColor(filterPanelMetrics.codeLines)
  );

  useEffect(() => {
    setFilterPanelMetrics({ ...filterMetrics });
    setCodeLinesColor(getSliderColor(filterMetrics.codeLines));
  }, [filterMetrics]);

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              trackBg: codeLinesColor,
              trackHoverBg: codeLinesColor,
              handleColor: codeLinesColor,
              handleActiveColor: codeLinesColor,
              handleActiveOutlineColor: codeLinesColor,
              dotActiveBorderColor: codeLinesColor,
              colorPrimaryBorderHover: codeLinesColor,
            },
          },
        }}
      >
        <div className="slider-container">
          <Slider
            min={0}
            max={filterMetrics.maxCodeLine}
            defaultValue={0}
            value={filterPanelMetrics.codeLines}
            onChange={(value) => {
              setFilterPanelMetrics({
                ...filterPanelMetrics,
                codeLines: value,
              });
              setCodeLinesColor(getSliderColor(value));
            }}
            onChangeComplete={(value) => {
              setFilterMetrics({ ...filterMetrics, codeLines: value });
            }}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default SliderFilterMetrix;
