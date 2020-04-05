@extends('layouts.app')
@section('content')
<div class="row">
    <div class="col-md-7">
        <div class="panel panel-defauld">
            <div class="panel-heading">
                <h1 class="panel-title">Bienvenido {{ auth()->user()->name }}</h1>
            </div>
        </div>
    </div>
</div>
@endsection