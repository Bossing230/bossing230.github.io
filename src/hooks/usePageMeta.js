import { useEffect } from "react";

// Sets the document title and meta description for the current page.
export default function usePageMeta(description, title = "Rebamonte Portfolio") {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [description, title]);
}
