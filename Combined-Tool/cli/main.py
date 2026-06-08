import typer
from rich.console import Console
from rich.panel import Panel

# Initialize the Typer app
app = typer.Typer(help="PhishMasterX - Educational Defensive Cybersecurity CLI")
console = Console()

@app.command(name="info")
def info():
    """Display system status and ethical compliance rules."""
    console.print(Panel.fit(
        "[bold green]PhishMasterX CLI[/bold green]\n"
        "[yellow]Status:[/yellow] Operational\n"
        "[red]Mode:[/red] EDUCATIONAL ONLY",
        title="System Info"
    ))

@app.command(name="ping")
def ping():
    """Simple connection test."""
    console.print("[bold blue]Pong![/bold blue] CLI engine is responsive.")

if __name__ == "__main__":
    app()