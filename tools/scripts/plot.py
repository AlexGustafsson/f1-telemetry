import pandas as pd
import plotly.graph_objects as go
from plotly.subplots import make_subplots

df = pd.read_csv('./examples/data.txt')
df2 = pd.read_csv('./examples/data2.txt')
df3 = pd.read_csv('./examples/data3.txt')
df4 = pd.read_csv('./examples/data4.txt')

fig = make_subplots(rows=4, cols=1)

fig.add_trace(
    go.Scatter(name="Speed", x=df["time"], y=df["speed"]), row=1, col=1)

fig.add_trace(
    go.Scatter(name="Throttle", x=df3["time"], y=df3["throttle"]), row=2, col=1
)

fig.add_trace(
    go.Scatter(name="Brake", x=df2["time"], y=df2["brake"]), row=3, col=1
)

fig.add_trace(
    go.Scatter(name="Lap", x=df4["time"], y=df4["lap"]), row=4, col=1
)

fig.show()
