import con from "../database.js";

export const fetchWeatherReport = async (userId) => {
  try {
    // SQL query to fetch the report data for the user
    const query = `
            SELECT 
                u.username, 
                ws.city, 
                ws.weather_info, 
                ws.search_date 
            FROM 
                weather_searches ws 
            INNER JOIN 
                users u 
            ON 
                ws.user_id = u.id
            WHERE 
                ws.user_id = ?
            ORDER BY 
                ws.search_date DESC;
        `;
    const [rows] = await con.query(query, [userId]); // Pass userId to filter results
    return rows;
  } catch (err) {
    throw new Error("Error fetching weather report: " + err.message);
  }
};
