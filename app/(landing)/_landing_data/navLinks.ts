// NavLinks type
export type navLinkType = {
  type: string;
  name: string;
  link: string;
};

export const NavLinks: navLinkType[] = [
  {
    type: "page-scroll",
    name: "Explore",
    link: "#landing-explore",
  },
  {
    type: "page-scroll",
    name: "Features",
    link: "#landing-features",
  },
  {
    type: "page-scroll",
    name: "Working",
    link: "#landing-steps",
  },
  {
    type: "page-scroll",
    name: "Contact",
    link: "#landing-contact",
  },
];
