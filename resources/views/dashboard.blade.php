@extends('layouts.app')
@section('content')
<div class="row">
    <div class="col-md-7">
        <div class="panel panel-defauld">
            <div class="panel-heading">
                <h1 class="panel-title">Bienvenido {{ auth()->user()->name }}</h1>
            </div>
            <div class="panel-body">
                <strong>Email: </strong> {{ auth()->user()->email }}
            </div>
            <div class="panel-footer">
                <form action="{{route('logout')}}" method="post">
                    {{ csrf_field() }}
                    <button class="btn btn-danger btn-xs btn-block  ">Logout</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection