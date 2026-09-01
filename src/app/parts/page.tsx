import type { Metadata } from "next";
import { PartsListPageView } from "@/verticals/parts/pages/PartsListPageView";

export const metadata: Metadata = { title: "Parts | Grease Point" };

const Page = () => <PartsListPageView />;

export default Page;
