import { commandItems, deployments, projects, users } from "./demoData";

describe("demo data", () => {
  it("keeps dashboard entities realistic and linkable", () => {
    expect(projects).toHaveLength(5);
    expect(users.some((user) => user.status === "invited")).toBe(true);
    expect(deployments.map((deployment) => deployment.project)).toContain("Console");
    expect(commandItems.map((item) => item.value)).toEqual([
      "overview",
      "projects",
      "team",
      "settings",
      "billing"
    ]);
  });
});
