const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Only admin users can access this.' });
  }
};

const isMaterialDesigner = (req, res, next) => {
  if (req.user && req.user.role === 'MATERIAL_DESIGNER') {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Only material designer users can access this.' });
  }
};

const isMaterialReviewer = (req, res, next) => {
  if (req.user && req.user.role === 'MATERIAL_REVIEWER') {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Only material reviewer users can access this.' });
  }
};

export default {
  isAdmin,
  isMaterialDesigner,
  isMaterialReviewer
}