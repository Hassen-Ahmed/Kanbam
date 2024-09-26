import { ResponsivePie } from "@nivo/pie";
import { useContext } from "react";
import { IkanbamContext, KanbamContext } from "../../../context/kanbamContext";
import { IDataPie } from "../Dashboard";

export default function PieChart({ data }: { data: IDataPie[] }) {
  const { theme } = useContext(KanbamContext) as IkanbamContext;

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
      arcLinkLabelsTextColor={theme == "light" ? "#5e6c84" : "#adbccc"}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      motionConfig="wobbly"
    />
  );
}
