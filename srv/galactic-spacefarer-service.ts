import { Request, Service } from "@sap/cds";

export default (srv: Service) => {
  const { Spacefarer } = srv.entities;

  srv.before("CREATE", Spacefarer, async (req: Request) => {
  });
};
