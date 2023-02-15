/**
 * @openapi
 * /users:
 *   get:
 *     summary: 회원 목록 조회
 *     responses:
 *       200:
 *          content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          email:
 *                              type: string
 *                          name:
 *                              type: string
 *                          phone:
 *                              type: string
 *                          personal:
 *                              type: string
 *                          prefer:
 *                              type: string
 */
