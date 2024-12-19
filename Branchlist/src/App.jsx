import React from "react";
import{BrowserRouter,Routes,}
import Branchlist from "./Components/Branchlist";
import Insertform from "./Components/Insertform";
import PopupButton from "./Components/PopupButton";
import EditBranch from "./Components/EditBranch"; // Import EditBranch

const App = () => {
  return (
    <BrowserRouter>
      {/* Define Routes for specific components */}
      <Routes>
        <Route path="/" element={<Branchlist />} />
        <Route path="/insert" element={<Insertform />} />
        <Route path="/popup" element={<PopupButton />} />
        <Route path="/branch/edit/:id" element={<EditBranch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
