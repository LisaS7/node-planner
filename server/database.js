function getDB(conn) {
    try {
        let db = conn.db(process.env.PLANNER_NS);
        return db;
    } catch (e) {
        console.error(`Unable to connect: ${e}`);
    }
}

export default getDB