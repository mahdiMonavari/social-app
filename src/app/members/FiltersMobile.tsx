import { Button, Drawer } from "@heroui/react";
import { IoMdOptions } from "react-icons/io";

import Filters from "./Filters";

function FiltersMobile({ count }: { count?: number }) {
  return (
    <div className="text-white block md:hidden">
      <Drawer>
        <Button variant="secondary">
          <IoMdOptions />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="bottom">
            <Drawer.Dialog>
              <Drawer.Header>
                <Drawer.Heading>Drawer Title</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <Filters scope="mobile" count={count} />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}

export default FiltersMobile;
