describe("DART Train Times", () => {
  it("displays page title", () => {
    cy.visit("http://localhost:3000/");

    cy.get("h1").should("contain", "DART Train Times");
  });

  it("provides error message if unable to understand request", () => {
    cy.visit("http://localhost:3000/");

    cy.get("input").type("not something I know about");
    cy.get("button").click();

    cy.get("p").should(
      "contain",
      "Sorry, I don't understand what you're asking me."
    );
  });

  it("returns a list of random stations if asked for examples", () => {
    cy.visit("http://localhost:3000/");

    cy.intercept(
      {
        method: "GET",
        url: "/api/stations",
      },
      { fixture: "stations.json" }
    );

    cy.get("input").type("stations");
    cy.get("button").click();

    cy.get("p").should(
      "contain",
      "Here are some example stations you could ask about:"
    );

    cy.get(".stations-list > :nth-child(1)").should("contain", "Mallow");
    cy.get(".stations-list > :nth-child(2)").should("contain", "Station 2");
  });

  it("returns station arrivals", () => {
    cy.visit("http://localhost:3000/");

    cy.intercept(
      {
        method: "GET",
        url: "/api/stations/Mallow",
      },
      { fixture: "station.json" }
    );

    cy.get("input").type("Mallow station");
    cy.get("button").click();

    cy.get("p").should("contain", "The upcoming arrivals for Mallow are:");
    cy.get(".arrivals-list > :nth-child(1)").should("contain", "Train to Cork");
    cy.get(".arrivals-list > :nth-child(2)").should(
      "contain",
      "Train to Station 1"
    );
  });
});
