exports.seed = async function (knex) {
  await knex("site").del()
  await knex("site").insert([
    { name: "name", value: "Martial Lambert Photographie" },
    {
      name: "description",
      value:
        `Bonjour, accompagnateur montagne pyrénéen et photographe voyageur, je vous propose à travers ce site,
de partir à l'aventure en image et à la découverte de mon travail photographique, avec j'espère, plaisir et intérêt
Merci et..... A bientôt peut être !`.replace(/\n+/g, "<br>"),
    },
    {
      name: "photographer",
      value: "/public/images/defaults/photographer.jpg",
    },
    {
      name: "background.primary",
      value: "/public/images/defaults/primary.jpg",
    },
    {
      name: "background.secondary",
      value: "/public/images/defaults/secondary.jpg",
    },
    {
      name: "background.tertiary",
      value: "/public/images/defaults/tertiary.jpg",
    },
  ])
}
