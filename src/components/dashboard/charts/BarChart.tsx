import { ResponsiveBar } from "@nivo/bar";
import { IDataBar } from "../Dashboard";
import { useAppSelector } from "../../../features/hooks";

const font_rotate = window.innerWidth < 700 ? 15 : 0;

export default function BarChart({
  data,
  legendName,
}: {
  data: IDataBar[];
  legendName: string;
}) {
  const themeName = useAppSelector((state) => state.theme.themeName);

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
              fill: themeName == "light" ? "#5e6c84" : "#adbccc",
            },
          },
          legend: {
            text: {
              fontSize: 14,
              fill: themeName == "light" ? "#5e6c84" : "#adbccc",
            },
          },
        },
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: font_rotate,
        legend: `${legendName}`,
        legendPosition: "middle",
        legendOffset: 42,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickValues: data ? data.length + 1 : 1,
        format: (value) => Math.floor(value),
      }}
      labelTextColor="#1d2125"
      motionConfig="molasses"
    />
  );
}
