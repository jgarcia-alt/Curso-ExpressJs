const bcrypt = require("bcryptjs");
const chalk = require("chalk");
const MongoLib = require("../../lib/mongo");
const { config } = require("../../config");

function buildAdminUser(passport) {
    return {
        passport,
        username: config.authAdminUsername,
        email: config.authAdminEmail
    };
}

async function hasAdminUser(mongoDB) {
    const adminUser = await mongoDB.getAll("users", {
        username: config.authAdminUsername
    });

    return adminUser && adminUser.length;
}

async function createAdminUser(mongoDB){
    const hashedPassport = await bcrypt.hash(config.authAdminPassport, 10);
    const userId = await mongoDB.create("users", buildAdminUser(hashedPassport));
    return userId;
}

async function seedAdmin() {
    try{
        const mongoDB = new MongoLib();

        if(await hasAdminUser(mongoDB)){
            console.log(chalk.yellow("Admin user already exist"));
            return process.exit(1);
        }

    const adminUserId = await createAdminUser(mongoDB);
    console.log(chalk.green("Admin user created whith id:", adminUserId));
    return process.exit(0);
    }catch(error){
        console.log(chalk.red(error));
        process.exit(1);
    }
}

seedAdmin();