import { Suspense } from "react";
import SearchResultClient from "../components/SearchResultClient";
import LoadingPage from "../components/LoadingPage";

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
        <SearchResultClient />
    </Suspense>
  );
}