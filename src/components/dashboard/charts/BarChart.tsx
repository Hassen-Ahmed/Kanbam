import { ResponsiveBar } from "@nivo/bar";
import { useContext } from "react";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";
import { IDataBar } from "../Dashboard";

const font_rotate = window.innerWidth < 700 ? 15 : 0;

export default function BarChart({ data }: { data: IDataBar[] }) {
  const { theme } = useContext(KanbamContext) as IkanbamContext;

  return (
    <ResponsiveBar
      data={data}
      keys={["tasks"]}
      indexBy="title"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: "nivo" }}
      theme={{
        axis: {
          ticks: {
            text: {
              fontSize: 12,
              fill: theme == "light" ? "#5e6c84" : "#adbccc",
            },
          },
          legend: {
            text: {
              fontSize: 14,
              fill: theme == "light" ? "#5e6c84" : "#adbccc",
            },
          },
        },
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: font_rotate,
        legend: "Lists",
        legendPosition: "middle",
        legendOffset: 42,
      }}
      labelTextColor="#1d2125"
      motionConfig="molasses"
    />
  );
}
