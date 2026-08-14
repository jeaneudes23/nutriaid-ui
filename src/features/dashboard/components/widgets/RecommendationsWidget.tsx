import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, SyringeIcon, UtensilsIcon } from "lucide-react";
import Link from "next/link";

const TIPS = [
  {
    icon: <UtensilsIcon />,
    title: "Introduce Rich Iron Foods",
    summary: "A great choice for leo (1y m6) to support healthy growth",
  },
  {
    icon: <SyringeIcon />,
    title: "Upcoming vaccination",
    summary: "A great choice for leo (1y m6) to support healthy growth",
  },
];
export const RecommendationsWidget = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Recent care tips</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        {TIPS.map((tip, i) => (
          <div key={i} className="border-primary bg-primary/5 rounded border-l-4 p-4">
            <div className="font-bold">{tip.title}</div>
            <div className="text-muted-foreground text-sm">{tip.summary}</div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="grid">
        <Link href={"/admin/recommendations"} className={buttonVariants({ variant: "outline" })}>
          View all tips
          <ArrowRightIcon />
        </Link>
      </CardFooter>
    </Card>
  );
};
