import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { InstaPost } from "@/lib/models/insta-post";

export function PostCard({ post }: { post: InstaPost }) {
  return (
    <Card key={post.id} className="hover:shadow-md transition-shadow hover:scale-102 h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row gap-2 items-center flex-wrap">
            <h3 className="font-semibold text-xl">{post.caption}</h3>
          </div>
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
