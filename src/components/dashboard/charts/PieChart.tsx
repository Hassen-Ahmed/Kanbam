import { ResponsivePie } from "@nivo/pie";
import { IDataPie } from "../Dashboard";
import { useAppSelector } from "../../../features/hooks";

export default function PieChart({ data }: { data: IDataPie[] }) {
  const themeName = useAppSelector((state) => state.theme.themeName);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ datum: "data.color" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={themeName == "light" ? "#5e6c84" : "#adbccc"}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      motionConfig="wobbly"
    />
  );
}
