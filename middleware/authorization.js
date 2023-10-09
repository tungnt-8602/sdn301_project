import roleConstants from '../common/roleConstants.js'

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === roleConstants.ADMIN) {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Only admin users can access this.' });
  }
};

const isMaterialDesigner = (req, res, next) => {
  if (req.user && req.user.role === roleConstants.MATERIAL_DESIGNER) {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Only material designer users can access this.' });
  }
};

export default {
  isAdmin,
  isMaterialDesigner
}