from mcp.server.fastmcp import FastMCP

# Create an MCP server
mcp = FastMCP("Demo")


# Add an addition tool
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


# Add a dynamic greeting resource
@mcp.resource("data://{filename}")
async def read_resource(filename: str) -> str:
    """Get a personalized greeting"""
    file = open(filename, "r")
    content = file.read()
    file.close()
    return content


if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport="stdio")
