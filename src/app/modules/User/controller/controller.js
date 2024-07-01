const {

    registration,
    login,
    fileUplaod,
    allUsers,
    getMinValue,
    getLike,
    getMaxValue,
    getLimitedUsers,
    getUserById,
    getProfile,
    getDistinctUser,
    getFilteredUsers,
    getFilteredUsersWithOrOprater,
    getOrderBy,
    getOrderByDes,
    insertInto,
    iSNULLSyntax } = require("../business/user.business")
exports.registration = async (req, res) => await registration(req, res)
exports.login = async (req, res) => await login(req, res)
exports.allUsers = async (req, res) => await allUsers(req, res)//
exports.getLimitedUsers = async (req, res) => await getLimitedUsers(req, res)//
exports.getMinValue = async (req, res) => await getMinValue(req, res)//
exports.getMaxValue = async (req, res) => await getMaxValue(req, res)//getMaxValue
exports.getLike = async (req, res) => await getLike(req, res)
exports.getProfile = async (req, res) => await getProfile(req, res)//
exports.getUserById = async (req, res) => await getUserById(req, res)//
exports.getDistinctUser = async (req, res) => await getDistinctUser(req, res)
exports.getFilteredUsers = async (req, res) => await getFilteredUsers(req, res)
exports.getFilteredUsersWithOrOprater = async (req, res) => await getFilteredUsersWithOrOprater(req, res)
exports.getOrderBy = async (req, res) => await getOrderBy(req, res)
exports.getOrderByDes = async (req, res) => await getOrderByDes(req, res)
exports.insertInto = async (req, res) => await insertInto(req, res)
exports.iSNULLSyntax = async (req, res) => await iSNULLSyntax(req, res)
exports.fileUplaod = async (req, res) => await fileUplaod(req, res)



