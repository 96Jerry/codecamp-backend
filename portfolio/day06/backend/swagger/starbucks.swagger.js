/**
 * @openapi
 * /starbucks:
 *   get:
 *     summary: 커피 메뉴 리스트 가져오기
 *     responses:
 *       200:
 *          content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          name:
 *                              type: string
 *                          kcal:
 *                              type: int
 */
