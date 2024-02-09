import expressAsyncHandler from "express-async-handler";
const details = expressAsyncHandler((req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ success: false, message: "Invalid user", user: false });
  } else {
    const data = encrypt(req.user);
    res.status(200).json({ success: true, message: "User has verified", user: true, data: data });
  }
});

const add = expressAsyncHandler((req, res) => {
  console.log(req.body);

  res.status(200).json({ success: true, message: "Employee has been added" });
})
export {
  details,
  add
}