const rewayahfans = {
  id: "rewayahfans",
  name: "RewayahFans",
  icon: "https://rewayahfans.net/wp-content/uploads/2023/12/logo-1.png",
  site: "https://rewayahfans.net",
  version: 1,
  lang: "ar",
  type: "novel",

  async popularNovels(page) {
    const url = `${this.site}/page/${page}`;
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const novels = [];
    doc.querySelectorAll(".bs").forEach((el) => {
      const a = el.querySelector("a.series");
      if (!a) return;

      novels.push({
        title: a.getAttribute("title") || a.textContent.trim(),
        url: a.getAttribute("href"),
        cover: el.querySelector("img")?.getAttribute("src"),
      });
    });

    return novels;
  },

  async parseNovel(novelUrl) {
    const res = await fetch(novelUrl);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const chapters = [];
    doc.querySelectorAll("ul.chapters li a").forEach((a) => {
      chapters.push({
        name: a.textContent.trim(),
        url: a.href,
      });
    });

    return {
      title: doc.querySelector("h1.entry-title")?.textContent.trim(),
      cover: doc.querySelector(".thumb img")?.getAttribute("src"),
      summary: doc.querySelector(".entry-content.entry")?.textContent.trim(),
      chapters,
    };
  },

  async parseChapter(chapterUrl) {
    const res = await fetch(chapterUrl);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    return doc.querySelector(".epcontent.entry-content")?.innerHTML;
  },
};
