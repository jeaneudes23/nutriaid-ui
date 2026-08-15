import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import { CheckIcon, CircleIcon, ExternalLinkIcon, MoveVerticalIcon, PersonStandingIcon, RulerDimensionLineIcon, ScaleIcon, ThumbsUpIcon, WeightIcon } from "lucide-react";
import Link from "next/link";

const STATS = [
  {
    title: "Weight",
    icon: <WeightIcon className="size-5" />,
    value: 14.2,
    unit: "kg",
  },
  {
    title: "Height",
    icon: <MoveVerticalIcon className="size-5" />,
    value: 69,
    unit: "cm",
  },
  {
    title: "Latest MUAC",
    icon: <CircleIcon className="size-5" />,
    value: 69,
    unit: "cm",
  },
  {
    title: "Latest BMI",
    icon: <PersonStandingIcon className="size-5" />,
    value: 69,
    unit: "",
  },
];

export default function page() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold lg:text-2xl">Nutritional Assessment Result</h2>
          <p className="text-muted-foreground">Based on recent measurements recorded on 12/7/2026.</p>
        </div>
        <div>
          <div className="bg-primary/10 text-primary border-primary inline-flex items-center gap-1 rounded-full border px-3 py-2 font-bold">
            <CheckIcon />
            Healthy
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="grid grid-cols-3 gap-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur facilis cum consectetur excepturi, laborum laboriosam odio velit, commodi beatae earum veritatis inventore sed.
            Dignissimos enim aut deserunt fugiat asperiores cum, officiis commodi id ut consequuntur, quo in nobis iste voluptatibus quidem eius. Officia, quis! Non saepe nostrum repellat velit nemo
            mollitia fuga? Atque quae molestiae sunt nisi delectus in qui, mollitia consequatur culpa, facilis, perferendis porro aliquam voluptas necessitatibus! Omnis assumenda explicabo deserunt
            velit temporibus eius deleniti quasi. Aut molestiae iste natus sequi ipsum harum, hic inventore doloribus possimus pariatur voluptates commodi placeat at incidunt quaerat fugit! Voluptate,
            nesciunt fuga.
          </CardContent>
          <CardFooter>
            <Link href={"/admin/recommendations/4949"} className={cn(buttonVariants({}))}>
              <ThumbsUpIcon />
              View recommendations
            </Link>
          </CardFooter>
        </Card>
        <Card className="pb-0">
          <CardHeader>
            <CardTitle>Calculated metrics</CardTitle>
          </CardHeader>
          <CardContent>
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border bg-gray-100 p-3 shadow-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="text-primary">{stat.icon}</span>
                  <span className="font-medium">{stat.title}</span>
                </span>
                <span className="text-primary inline-flex items-center font-medium">
                  {stat.value} {stat.unit}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t bg-gray-100 pb-6">
            <div className="group flex items-center gap-2">
              <UserAvatar name={"Emma Hum"} className="bg-primary text-primary-foreground text-center" />
              <Link href={"/admin/children/3939"}>
                <p className="group-hover:text-primary inline-flex items-center gap-2 font-semibold group-hover:underline">
                  Emma Hum <ExternalLinkIcon className="size-4" />
                </p>
                <p className="text-muted-foreground text-xs font-medium">Male</p>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
